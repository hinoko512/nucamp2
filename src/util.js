export function presentToast(message) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = 5000;

  document.body.appendChild(toast);
  return toast.present();
}