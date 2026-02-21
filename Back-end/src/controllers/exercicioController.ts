import { Request, Response } from 'express';
import { getAllExercicios, getExerciciosById, createExercicio, updateExercicioProgressao, updateExercicioRegressao, deleteExercicio } from '../models/ExercicioModel';

export class ExercicioController {
    public async getAllExercicios(req: Request, res: Response): Promise<void> {
        try {
            const httpResponse = await getAllExercicios();
            res.status(200).json(httpResponse);

        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar exercícios', error });
        };
    };

    public async getExercicioById( req: Request, res: Response): Promise<void>{
        try{
            const id_exercicio = Number(req.params.id_exercicio);
            const httpResponse = await getExerciciosById(id_exercicio);
            if (httpResponse){
                res.status(200).json(httpResponse);
            } else{
                res.status(404).json({ message: 'Exercício não encontrado' });
            }
            
        } catch (error){
            res.status(500).json({ message: 'Erro ao buscar exercícios', error });
        };
    };

    public async createExercicio(req: Request, res: Response): Promise<void> {
        try{
            const bodyValue = req.body;
            const httpResponse = await createExercicio(bodyValue);
            res.status(201).json(httpResponse);

        } catch(error){
           res.status(500).json({ message: 'Erro ao criar exercícios', error }); 
        };
    };

    public async updateExercicioProgressao(req: Request, res: Response): Promise<void>{
        try{
            const id_exercicioAlterado = Number(req.params.id_exercicioAlterado);
            const exercicioAlterado = await getExerciciosById(id_exercicioAlterado);
            if (exercicioAlterado){
                const id_progressao = Number(req.body.id_progressao);
                const sucesso = await getExerciciosById(id_progressao);
                if(sucesso){
                    const progressao = await updateExercicioProgressao(id_exercicioAlterado, id_progressao);
                    if(progressao){
                        res.status(200).json({message: `O exercício ${sucesso.nome} foi inserido como progressão do exercício ${exercicioAlterado.nome}`});
                    } else{
                        res.status(500).json({ message: 'Falha técnica ao atualizar a progressão no banco de dados.' });
                        return;
                    }
                } else{
                    res.status(404).json({ message: `Não foi possível definir progressão: o exercício de ID: ${id_progressao} não existe.` });
                    return;
                }
            } else{
                res.status(404).json({ message: `O exercício com ID ${id_exercicioAlterado} não foi encontrado.` });
                return;
            }
        } catch(error){
            res.status(500).json({message: 'Erro ao atualizar o exercício', error})
        };
    };
};
