import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GuidelineService } from '../guideline.service';
import { Guideline } from '../guideline.model';
import { UserService } from './../../user/user.service';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-guideline-list-item',
  templateUrl: './guideline-list-item.component.html',
  styleUrls: ['./guideline-list-item.component.scss']
})
export class GuidelineListItemComponent implements OnInit {
  @Input() guideline: Guideline;
  @Input() i;
  detailOpen = false;
  client: User;

  constructor( public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               private guidelineService: GuidelineService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
  }

  deleteGuidelineDialog(guideline) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        guidelineID: guideline.guidelineID,
        guidelineName: guideline.guidelineName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = guideline.guidelineID;
        this.guidelineService.deleteGuideline(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editGuideline(guideline) {
    const url = `dashboard/guidelines/${guideline.guidelineID}`;
    this.router.navigate([url]);
    return this.guidelineService.editShow = true;
  }


  linkToChild(guideline) {
    const url = `dashboard/guidelines/${guideline.guidelineID}`;
    this.router.navigate([url]);
  }

}
