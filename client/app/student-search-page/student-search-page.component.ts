import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {StudentProfileService} from "../services/profile/student/student-profile.service";
import {StudentProfile} from "../services/profile/student/student-profile";

@Component({
  selector: 'app-student-search-page',
  templateUrl: './student-search-page.component.html',
  styleUrls: ['./student-search-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [StudentProfileService]
})
export class StudentSearchPageComponent implements OnInit {
  private studentProfiles: StudentProfile[] = [];

  constructor(private studentProfileService: StudentProfileService) { }

  ngOnInit() {
    this.studentProfileService.getStudentProfiles()
      .subscribe(profiles => {
        this.studentProfiles = profiles;
      });
  }

}
