import { FormControl, FormGroup, Validators } from "@angular/forms";

export const getPeriodicElementForm = () => {
    return new FormGroup({
        uid: new FormControl(),
        name: new FormControl('', [Validators.required]),
        position: new FormControl(),
        weight: new FormControl(),
        symbol: new FormControl('')
    });
} 