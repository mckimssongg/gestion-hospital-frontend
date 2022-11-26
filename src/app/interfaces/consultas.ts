export interface Consultas {
  id_consulta: number;
  fecha: string;
  num_consultorio: number;
  id_especialidad: number;
  id_medico: number;
  id_paciente: number;
  especialidad?: string;
  medico?: string;
  paciente?: string;
}
