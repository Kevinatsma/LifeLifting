import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: Observable<User[]>;

  constructor( private userService: UserService) { }

  ngOnInit() {
  }

}
