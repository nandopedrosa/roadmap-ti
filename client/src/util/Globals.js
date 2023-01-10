//Toastr functions
function showSuccess(toast, msg) {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: msg, life: 3000 });
}

function showError(toast, msg) {
    toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 });
}

export { showSuccess, showError };