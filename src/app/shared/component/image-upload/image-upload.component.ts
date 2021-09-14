import { Component} from '@angular/core';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}

}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent{

  // @ts-ignore
  selectedFile: ImageSnippet;
  /*constructor(private imageService: ImageService){}*/

  processFile(imageInput:any) {
    console.log(this.selectedFile)

    const file: File = imageInput.files[0]

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;

    });

    reader.readAsDataURL(file);
  }
}
