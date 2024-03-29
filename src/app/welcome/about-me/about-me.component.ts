// about-me.component.ts
import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  forms!: any[];
  editMode!: boolean;
  id: any;
  showOptionsField!: boolean;
options: any;
  constructor(private formService: FormService) {}
  showAddFormModal = false;
  showDeleteConfirmationModal = false;
  formLabel:any
  formType:any
  ngOnInit(): void {
    this.loadForms();
  }
  resetForm() {
    this.formLabel = '';
    this.formType = 'text';
    this.options = '';
  }

  loadForms(): void {
    this.formService.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }
  addForm(): void {
    const payload ={
      label:this.formLabel,
      type:this.formType,
      options:this.options
    }
    this.formService.addForm(payload).subscribe(() => {
      this.loadForms();
      this.hideAddForm(); // Hide the modal
    });
  }


  showAddForm(): void {
    this.showAddFormModal = true;
  }

  hideAddForm(): void {
    this.showAddFormModal = false;
   this.resetForm();
   this.editMode=!this.editMode
  }


  onFormTypeChange() {
    if (this.formType === 'dropdown' || this.formType === 'radio' || this.formType === 'checkbox') {
      // Show the options field
      this.showOptionsField = true;
    } else {
      // Hide the options field for other form types
      this.showOptionsField = false;
    }
  }
  // Function to display the delete confirmation modal
  showDeleteConfirmation(item: any): void {
    this.id=item._id
    this.showDeleteConfirmationModal = true;
  }

  // Function to hide the delete confirmation modal
  hideDeleteConfirmation(): void {
    this.showDeleteConfirmationModal = false;
  }

  // Function to confirm item deletion
  confirmDelete(): void {
    this.formService.deleteForm(this.id).subscribe(() => {
      this.loadForms();
    });
    this.hideDeleteConfirmation(); // Hide the modal
  }

  // Function to edit an item
  editItem(item: any): void {
    console.log(item);
    
    this.editMode=true
    this.formLabel=item.label
    this.formType=item.type
    this.options=item?.options
    this.id=item._id
    this.showAddForm(); // Show the add form modal with prepopulated values
  }
  editForm() {
    console.log(this.id);
    
    const payload = {
      label:this.formLabel,
    type:this.formType,
    options:this.options}
    this.formService.editForm(this.id, payload).subscribe(() => {
      this.loadForms();
      this.editMode=false
    });
  }
}
