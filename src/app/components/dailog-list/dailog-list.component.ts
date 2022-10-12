import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DailogModel } from 'src/app/models/dailog';
import { DailogService } from 'src/app/services/dailog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dailog-list',
  templateUrl: './dailog-list.component.html',
  styleUrls: ['./dailog-list.component.scss']
})
export class DailogListComponent implements OnInit {

  dailogForm: FormGroup;
  submitted = false;
  selectedLanguage = 'en';
  languageList: string[] = []

  constructor(private fb: FormBuilder, public dailogService: DailogService, private _snackBar: MatSnackBar) {
    this.dailogForm = this.fb.group({ data: new FormArray([]) });
  }

  get getDataFormArray() {
    return this.dailogForm.get('data') as FormArray;
  }

  onChangeLanguage(lan: any) {
    this.selectedLanguage = lan
    this.dailogForm = this.fb.group({ data: new FormArray([]) });
    this.dailogInitilization(lan)
  }


  getdialogTextsArray(i: number) {
    return this.getDataFormArray.at(i).get('dialogTexts') as FormArray
  }

  ngOnInit(): void {
    this.dailogInitilization();
    this.dailogService.getLanguageList().subscribe(data => this.languageList = data)
  }

  dailogInitilization(language = "en") {
    this.dailogService.getDailogData(language).subscribe(dailogData => {
      dailogData.forEach((data, index) => {
        this.getDataFormArray.push(
          this.fb.group({
            id: data.id,
            dialogName: [data.dialogName, Validators.required],
            language: data.language,
            dialogId: data.dialogId,
            dialogTexts: new FormArray([])
          })
        );
        const val = this.getdialogTextsArray(index)
        data.dialogTexts.forEach((v) => val.push(new FormControl(v.dialogText, Validators.required)));
      })
    })
  }

  // addDailogText(index: number) {
  //   this.getdialogTextsArray(index).push(new FormControl('', Validators.required));
  // }

  // delDailogText(oindex: number, iindex: number) {
  //   this.getdialogTextsArray(oindex).removeAt(iindex);
  // }

  saveDailogData(dialog: any) {
    this.submitted = true;
    if (dialog.invalid) return;
    const value = dialog.value as DailogModel
    value.dialogTexts = value.dialogTexts.map((dt: any, i: number) => {
      return {
        dialogSeqNumber: i + 1,
        dialogText: dt,
      }
    })
    console.log(value);
    this.dailogService.updateDailog(value).subscribe(data => {
      console.log('Submitted Data : ', data)
      this.onChangeLanguage(this.selectedLanguage);
      this.openSnackBar('Data has been updated successfully', 'mat-primary')
    }, err => this.openSnackBar('Something went wrong', 'mat-warn')
    )
  }

  openSnackBar(msg: string, css: string) {
    this._snackBar.open(msg, '', {
      duration: 4000,
      panelClass: ['mat-toolbar', css],
      // verticalPosition: 'top'
    });
  }


}
