import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageService } from '../image.service';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private storage : AngularFireStorage,
              private service : ImageService) { }

  ngOnInit(): void {
    this.service.getImageDetailList();
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      price:['', Validators.required],
      image:['',Validators.required],
    });
  }
  get f(){ return this.form.controls;}

  // handleFileInput(files: FileList) {
  //   var fileName = files.item(0).name;
  // }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      this.form.reset();
      return;
    }    
    var filePath = `${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    var formValue = this.form.value;
    this.storage.upload(filePath , this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          formValue.image = url;
          this.service.insertImageDetails(formValue);
        })
      })
    ).subscribe();
      this.form.reset();
      this.imgSrc = '/assets/img/image_placeholder.jpg';
  }

}
