import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    listOfTasks: any = [];

    constructor(
        private adminService: AdminService,
        private snakBar: MatSnackBar
    ) {
        this.getAllTasks();
    }

    getAllTasks() {
        this.adminService.getAllTasks().subscribe((res) => {
            // console.log(res);
            this.listOfTasks = res;
        })
    }

    deleteTask(id: number) {
        this.adminService.deleteTask(id).subscribe((res) => {
            this.snakBar.open("Task Deleted Successfully", "Close", {duration: 5000});
            this.getAllTasks();
        })
    }
}