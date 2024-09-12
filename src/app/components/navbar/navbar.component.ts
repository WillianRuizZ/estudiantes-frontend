import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, LayoutModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed = true;
}
