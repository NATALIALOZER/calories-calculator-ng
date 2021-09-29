import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageSnippet} from "../../models/interfaces";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() public events: any;
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
    });
    reader.readAsDataURL(file);
    console.log(reader.result)
  }
}
