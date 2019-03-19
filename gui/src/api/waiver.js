import config from './config';

export async function createWaiver(reg) {
  const url = `${config.apiUrl}/waiver/${reg.id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }

  return response.blob();
}

export async function printWaiver(reg) {
  try {
    const blob = await createWaiver(reg);
    const { document } = window;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Einverständniserklärung ${reg.child.firstName} ${reg.child.lastName}.pdf`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error printing waiver:', error);
    alert('Das Drucken der Einverständniserklärung hat leider nicht funktioniert.');
  }
}
