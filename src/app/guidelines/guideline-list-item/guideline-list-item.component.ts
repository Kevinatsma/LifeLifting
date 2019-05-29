import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GuidelineService } from '../guideline.service';
import { Guideline } from '../guideline.model';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-guideline-list-item',
  templateUrl: './guideline-list-item.component.html',
  styleUrls: ['./guideline-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidelineListItemComponent implements OnInit {
  @Input() guideline: Guideline;
  @Input() i;
  detailOpen = false;
  client: User;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               private guidelineService: GuidelineService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
  }

  deleteGuidelineDialog(guideline) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        gID: guideline.gID,
        guidelineName: guideline.guidelineName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = guideline.gID;
        this.guidelineService.deleteGuideline(id);
        console.log('deleted guideline');
      } else if (result === false) {
        return null;
      }
    });
  }

  editGuideline(guideline) {
    const url = `dashboard/guidelines/${guideline.gID}`;
    this.router.navigate([url]);
    return this.guidelineService.editShow = true;
  }

  duplicateGuideline(guideline) {
    this.guidelineService.duplicateGuideline(guideline);
  }


  linkToChild(guideline) {
    const url = `dashboard/guidelines/${guideline.gID}`;
    this.router.navigate([url]);
  }

}
