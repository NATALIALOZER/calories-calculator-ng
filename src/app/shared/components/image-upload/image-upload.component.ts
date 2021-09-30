import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageSnippet} from "../../models/interfaces";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() public events: any;
  @Output() onAdd: EventEmitter<ImageSnippet> = new EventEmitter<ImageSnippet>()
  public selectedFile!: ImageSnippet;
  public selected: boolean = false;

  public processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (el: any) => {
      this.selectedFile = {
        file: file,
        src: el.target.result
      };
      this.selected = true;
      this.onAdd.emit(this.selectedFile)
    });

    reader.readAsDataURL(file);
  }
}
