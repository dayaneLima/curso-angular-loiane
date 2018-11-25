import { AlunosModule } from './alunos.module';

describe('AlunosModule', () => {
  let alunosModule: AlunosModule;

  beforeEach(() => {
    alunosModule = new AlunosModule();
  });

  it('should create an instance', () => {
    expect(alunosModule).toBeTruthy();
  });
});
