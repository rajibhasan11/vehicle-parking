import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { unsubscribe } from '../../utils/util';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, color: string = 'success'): void {
    this.showSnackBar(message, color);
  }

  private showSnackBar(message: string, panelClass: string, vertical: 'top' | 'bottom' = 'bottom', duration: number = 4000): void {
    const ref = this.snackBar.open(message, '✕', {
      duration: duration,
      panelClass: panelClass,
      horizontalPosition: 'center',
      verticalPosition: vertical
    });
    const sub = ref.onAction().pipe(finalize(() => unsubscribe(sub))).subscribe(() => ref.dismiss());
  }

}
