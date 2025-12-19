// 1. Importar Supabase
import { createClient } from '@supabase/supabase-js'

// 2. PEGA AQUÍ TUS CLAVES DE SUPABASE
const supabaseUrl = "https://uplksonjwhkcyfnvoebb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eXBqbWFhY3ZnZW5ycGh1YXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NDAxMDcsImV4cCI6MjA4MDMxNjEwN30.VJcnUireRV1k968-loHQGJNsH4cyMKR8JbIHQBr4weA"

// 3. Inicializar la conexión
const supabase = createClient(supabaseUrl, supabaseKey)
console.log("Supabase conectado y listo.")

// 4. Función para Guardar los datos del formulario
// Esta función se activará cuando le des clic al botón "Guardar" en tu HTML
window.guardarReporte = async function() {
  
  // A. OBTENER VALORES DEL HTML
  // (Asegúrate de que los ID entre paréntesis coincidan con tu HTML)
  const serie = document.getElementById('charger-serial').value; 
  const voltaje = document.getElementById('charger-tipo').value; // Asumo que es el select de 24V/48V
  const estado = document.getElementById('charger-estado').value; // Necesitas crear este input en HTML
  const ciclos = document.getElementById('charger-ciclos').value; // Necesitas crear este input en HTML
  const horas = document.getElementById('charger-horas').value;   // Necesitas crear este input en HTML
  const agua = document.getElementById('charger-agua').value;     // Necesitas crear este input en HTML
  const obs = document.getElementById('charger-observacion').value; // Necesitas crear este input en HTML

  // B. ENVIAR A SUPABASE
  const { data, error } = await supabase
    .from('reportes_mensuales') // El nombre EXACTO de tu tabla
    .insert([
      { 
        fecha_registro: new Date(), // Pone la fecha de hoy automáticamente
        numero_serie: serie,
        tipo_equipo: "Bateria", // O puedes hacerlo dinámico
        voltaje: voltaje,
        estado: estado,
        ciclos_mes: parseInt(ciclos),     // Convierte texto a numero entero
        horas_promedio: parseFloat(horas),// Convierte texto a decimal
        litros_agua: parseFloat(agua),    // Convierte texto a decimal
        observaciones: obs
      },
    ])

  // C. VERIFICAR SI FUNCIONÓ
  if (error) {
    console.error('Error al guardar:', error.message)
    alert('❌ Error: ' + error.message)
  } else {
    console.log('Guardado exitoso:', data)
    alert('✅ ¡Reporte guardado en la nube!')
    // Opcional: Limpiar el formulario
    // document.getElementById('charger-form').reset();
  }
}