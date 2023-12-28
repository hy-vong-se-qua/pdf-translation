import { Component, AfterViewInit, ViewContainerRef, ComponentRef } from '@angular/core';
import { FileAttachmentCore } from '@app/shared/core/FileAttachmentCore';
import { PdfTranslationService } from '../../service/pdf-translation.service';
import { LoadingService } from '@app/shared/service/loading.service';
import { ApiProcess } from '@app/shared/decorator/decorator';
import { SelectOption } from '@app/shared/type/SelectOption';
import { BackdropComponent } from '@app/shared/ui/backdrop/backdrop.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent extends FileAttachmentCore implements AfterViewInit {
  public readonly LanguageFromOptions: SelectOption[] = [
    {
      value: 'en',
      display: 'English'
    },
    {
      value: 'ja',
      display: 'Japanese'
    }
  ];

  public readonly LanguageToOptions: SelectOption[] = [
    {
      value: 'vi',
      display: 'Vietnamese'
    },
  ];

  constructor(private service: PdfTranslationService, private view: ViewContainerRef) {
    super();
  }

  addEventListener() {
    const queryEl = (query: string): HTMLElement => {
      return this.view.element.nativeElement.querySelector(query);
    }
    const dragDropEl = queryEl("#upload-document-form");
    dragDropEl.addEventListener("dragover", (event) => this.dragOver(event));
    dragDropEl.addEventListener("drop", (event) => this.dropHandler(event));

    const buttonEl = queryEl("#submit");
    buttonEl.addEventListener("click", () => this.clickUploadFile());

    const selectEl = queryEl("#upload-document-form");
    selectEl.addEventListener("click", () => this.onClickSelectFile());
  }

  @ApiProcess()
  public async clickUploadFile() {
    if (!this.file) {
      document.getElementById("showmodal").click();
      document.getElementById("message").innerText = "Vui lòng lựa chọn file.";
      return;
    }
    const arr = this.file.name.split(".");
    const ext = arr.pop();
    if (ext != "pdf") {
      document.getElementById("showmodal").click();
      document.getElementById("message").innerText = "Hệ thống chỉ hỗ trợ định dạng PDF.";
      return;
    }
    const form = new FormData();
    const lang = (document.getElementById("from") as any).value
    form.append('file', this.file, this.file.name);
    form.append('lang', lang);
    form.append('fileName', this.file.name);
    const resp = await this.service.uploadFile(form);

    arr.push("vi");
    arr.push(ext);
    const a = document.createElement("a");
    const blob = new Blob([resp], {type: "application/pdf"});
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = arr.join(".");
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
