import { Component, OnInit } from '@angular/core';
// import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
// import {User} from "../model";
import { User } from '../_models';
import { UserService } from '../_services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [userId],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log(userId)
    var c = this.userService.getById(+userId)
    console.log(c)
    this.userService.getById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

//   updateCoin(name, price) {
//     this.route.params.subscribe(params => {
//     this.service.updateCoin(name, price, params['id']);
//     this.router.navigate(['index']);
//   });
// }
  onSubmit() {
    console.log(this.editForm.value)
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          this.router.navigate(['list-user']);
          // alert(error);
        });
  }

}