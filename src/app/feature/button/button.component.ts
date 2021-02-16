import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input("textButton") textButton: string = "Button";
  @Input("fulidButton") fulidButton: boolean = false;
  @Input("borderRadius") borderRadius: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private clickBtn() {
    this.onClick.emit(null);
  }

  private styleButton():any {
    return {
      'width': this.fulidButton ? '100%' : '50%',
      'font-size': this.fulidButton ? '1.2rem' : '.9rem',
      'border-radius': this.borderRadius ? '50px' : '0px',
    }
  }

}
