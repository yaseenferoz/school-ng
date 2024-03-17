// about-me.component.ts
import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  formData: any[] = [
    { label: 'Name', type: 'Text' },
    { label: 'Email', type: 'Email' }
  ];
  forms!: any[];
  editMode!: boolean;
  id: any;
  constructor(private formService: FormService) {}
  showAddFormModal = false;
  showDeleteConfirmationModal = false;
  formLabel:any
  formType:any
  newItem: any = {};
  ngOnInit(): void {
    this.loadForms();
  }
  loadForms(): void {
    this.formService.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }
  addForm(): void {
    const payload ={
      "label":this.formLabel,
      "type":this.formType
    }
    this.formService.addForm(payload).subscribe(() => {
      this.loadForms();
      this.hideAddForm(); // Hide the modal
    });
  }

  deleteForm(id: string): void {
    this.formService.deleteForm(id).subscribe(() => {
      this.loadForms();
    });
  }
  // Function to display the add form
  showAddForm(): void {
    this.showAddFormModal = true;
    this.newItem = {}; // Clear the newItem object
  }

  // Function to hide the add form
  hideAddForm(): void {
    this.showAddFormModal = false;
  }

  // Function to submit the add form
  submitAddForm(): void {
    // Logic to submit the form and add a new item
    this.formData.push(this.newItem); // Add new item to formData array
    this.hideAddForm(); // Hide the modal
  }

  // Function to display the delete confirmation modal
  showDeleteConfirmation(item: any): void {
    this.id=item._id
    this.showDeleteConfirmationModal = true;
    // Store the item to be deleted in a variable or use it directly in confirmDelete()
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
    console.log(item._id);
    
    this.editMode=true
    this.formLabel=item.label
    this.formType=item.type
    this.id=item._id
    this.showAddForm(); // Show the add form modal with prepopulated values
  }
  editForm() {
    console.log(this.id);
    
    const payload = {
      label:this.formLabel,
    type:this.formType}
    this.formService.editForm(this.id, payload).subscribe(() => {
      this.loadForms();
      this.editMode=false
    });
  }
}
