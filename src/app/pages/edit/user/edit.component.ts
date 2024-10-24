import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgOptimizedImage, CapitailizeFirst],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/profile-image-round-1326-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/pen-square-svgrepo-com.svg';
  imgSrc5: string = '../../../../assets/svg/arrow-to-top-left-svgrepo-com.svg'
  imgSrc6: string = '../../../../assets/svg/arrow-to-top-right-svgrepo-com.svg'
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  inputValues: Array<string> = ['username', 'email'];
  inputValues2: Array<string> = ['old', '', 'confirm'];
}
