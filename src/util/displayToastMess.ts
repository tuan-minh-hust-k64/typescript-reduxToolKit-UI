interface ToastMessage{
  title: string;
  message: string;
  type: string;
  time: number;
}


function toast(data: ToastMessage) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, (data.time + 1000));
  
      // Remove toast when clicked
      //@ts-ignore
      toast.onclick = function (e) {
      //@ts-ignore
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle"
      };
      //@ts-ignore
      const icon = icons[data.type];
      const delay = (data.time / 1000).toFixed(2);
  
      toast.classList.add(`toast--${data.type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                        <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${data.title}</h3>
                          <p class="toast__msg">${data.message}</p>
                      </div>
                      <div class="toast__close">
                        <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
}
export const showSuccessToast=(data: ToastMessage)=> {
  toast(data)
}
