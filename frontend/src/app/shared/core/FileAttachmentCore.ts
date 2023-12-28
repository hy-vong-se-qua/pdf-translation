import { Directive, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Utilities } from '../utility/utilities';
import { SystemConfig } from '@app/config/SystemConfig';

/**
 * File attachment abstract class.
 * When the user selects or drags and drops files, each file will be uploaded onto the file server in the work folder.
 * If the user clicks upload attachment, this class will call API pushes the temp files in the work folder to the main folder.
 * If the user clicks close the dialog, this class will call API removes the temp files in the work folder.
 */
@Directive()
export abstract class FileAttachmentCore implements AfterViewInit {
  @ViewChild('inputFile') protected inputFile: ElementRef<HTMLInputElement>;

  protected abstract addEventListener(): void;

  public acceptFiles: string = ".pdf";
  protected file: File = null;

  constructor(
  ) {
  }

  ngAfterViewInit() {
    this.addEventListener();

    this.inputFile.nativeElement.addEventListener("change", (event) => this.onChangeFile(event));
  }

  /**
   * Drag and drag processing.
   * @param event Drag and drop event
   */
  public dropHandler(event: any) {
    event.preventDefault();
    const files = [];
    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          if (typeof item.webkitGetAsEntry == 'function') {
            if (!item.webkitGetAsEntry()?.isFile) {
              return null;
            }
          }
          const file = item.getAsFile();
          files.push(file);
        }
      });
    } else {
      [...event.dataTransfer.files].forEach(file => {
        files.push(file);
      });
    }
    this.file = files[0];
    console.log(this.file)
  }

  public dragOver(event: DragEvent) {
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault()
  }

  public onClickSelectFile() {
    this.inputFile.nativeElement.click();
  }

  public onChangeFile(event: any) {
    const files = event.target.files;
    this.file = files[0];
  }

	public downloadFile(file: any): void{
		const aTag = document.createElement("a");
		aTag.download = file.name;
		var url = window.URL.createObjectURL(file);
		aTag.href = url;
		aTag.click();
	}

  protected createFileUploadAttachment(file: any) {
    return file;
  }

  protected checkFileSize(fileSize: number): boolean {
    const maxFileSize = SystemConfig.FILE_UPLOAD_MAXIMUM_SIZE * 1024**2;
    if (fileSize > maxFileSize) {
      return false;
    }
    return true;
  }
}
