import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../_model/course';


@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'Delete'];


  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.http.get<Course[]>('http://localhost:8080/courses/getAll').subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  deleteCourse(id: string) {
    this.http.delete(`http://localhost:8080/courses/delete/${id}`).subscribe(
      () => {
        this.getAllCourses();
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  addCourse(course: Course) {
    this.http.post<Course>('http://localhost:8080/courses/add', course).subscribe(
      (response: Course) => {
        // Handle successful addition (if needed)
        this.getAllCourses();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding course:', error);
      }
    );
  }

  addModuleCoefficient(id: string, moduleName: string, coefficient: number) {
    const body = { moduleName, coefficient };
    this.http.post(`http://localhost:8080/courses/${id}/addModuleCoefficient`, body).subscribe(
      () => {
        // Handle successful addition (if needed)
        
        this.getAllCourses();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding module coefficient:', error);
      }
    );
  }

  searchCourseById(id: string) {
    this.http.get(`http://localhost:8080/courses/getById/${id}`).subscribe(
      () => {
        // Handle successful search (if needed)
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching course by ID:', error);
      }
    );
  }

  // Optionally, you can add more methods as needed
}
