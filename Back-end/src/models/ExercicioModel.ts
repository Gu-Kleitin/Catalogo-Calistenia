import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2';

export interface InterfaceExercicio extends RowDataPacket{
    id_exercicio: number;
    nome: string;
    nivel: number;
    tipo: string;
    habilidade: boolean;
    grupo_muscular: string;
    descricao: string;
    musculos_alvo: string;
    url_midia: string;
    id_progressao: number | null;
    id_regressao: number | null;
} //Para caso eu visite depois, no ts podemos colocar '| null' para caso um campo possa ser nulo

export const getAllExercicios = async (): Promise<InterfaceExercicio[]> => {
    const [rows] = await pool.query<InterfaceExercicio[]>('SELECT * FROM Exercicio');
    return rows;
};

export const getExerciciosById = async (id: number): Promise<InterfaceExercicio | undefined> => {
    const [rows] = await pool.query<InterfaceExercicio[]>('SELECT * FROM Exercicio WHERE id_exercicio = ?', [id]);
    return rows[0];
};

export const createExercicio = async (exercicio: Omit<InterfaceExercicio, 'id_exercicio'>): Promise<number> => {
    // Omit serve para pegar a interface, mas ignorar o campo 'id_exercicio'
    
    const { nome, nivel, tipo, habilidade, grupo_muscular, descricao, musculos_alvo, url_midia, id_progressao, id_regressao } = exercicio;
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO Exercicio (nome, nivel, tipo, habilidade, grupo_muscular, descricao, musculos_alvo, url_midia, id_progressao, id_regressao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, nivel, tipo, habilidade, grupo_muscular, descricao, musculos_alvo, url_midia, id_progressao, id_regressao]
    );

    return result.insertId;
};

export const updateExercicioProgressao = async (id: number, idProgressao: number | null): Promise<boolean> =>{
    const [result] = await pool.query<ResultSetHeader>('UPDATE Exercicio SET id_progressao = ? WHERE id_exercicio = ?', [idProgressao, id])
    return result.affectedRows > 0;
};

export const updateExercicioRegressao = async (id: number, idRegressao: number | null): Promise<boolean> =>{
    const [result] = await pool.query<ResultSetHeader>('UPDATE Exercicio SET id_regressao = ? WHERE id_exercicio = ?', [idRegressao, id])
    return result.affectedRows > 0;
};

export const deleteExercicio = async (id: number): Promise<boolean> => {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM Exercicio WHERE id_exercicio = ?', [id])
    return result.affectedRows > 0;
};