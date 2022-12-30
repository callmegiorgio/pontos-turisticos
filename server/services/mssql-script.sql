------------------------------------------------------------
-- Crie tabela Ponto
------------------------------------------------------------
IF OBJECT_ID('dbo.Ponto', 'U') IS NULL
    CREATE TABLE [dbo].[Ponto] (
        [id]         INTEGER PRIMARY KEY IDENTITY(1, 1),
        [nome]       VARCHAR(80)         NOT NULL,
        [cidade]     VARCHAR(80)         NOT NULL,
        [estado]     CHAR(2)             NOT NULL,
        [referencia] VARCHAR(80)         NOT NULL,
        [descricao]  VARCHAR(100)        NOT NULL,
        [timestamp]  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
GO

------------------------------------------------------------
-- Crie stored procedure SP_InserirPonto
------------------------------------------------------------
IF OBJECT_ID('dbo.SP_InserirPonto', 'P') IS NULL
    EXEC('CREATE PROCEDURE [dbo].[SP_InserirPonto] AS SET NOCOUNT ON;')
GO

ALTER PROCEDURE [dbo].[SP_InserirPonto] (
    @nome       VARCHAR(80),
    @cidade     VARCHAR(80),
    @estado     CHAR(2),
    @referencia VARCHAR(80),
    @descricao  VARCHAR(100),
    @ponto_id   INT OUTPUT
)
AS
BEGIN
    DECLARE @tmp TABLE (ponto_id INT);

    INSERT INTO ponto (nome, cidade, estado, referencia, descricao)
    OUTPUT inserted.id INTO @tmp
    VALUES (@nome, @cidade, @estado, @referencia, @descricao);

    SELECT @ponto_id = ponto_id FROM @tmp;
END
GO

------------------------------------------------------------
-- Crie função de table FN_ObterPontos
------------------------------------------------------------
IF OBJECT_ID('dbo.FN_ObterPontos', 'IF') IS NOT NULL
    DROP FUNCTION [dbo].[FN_ObterPontos]
GO

CREATE FUNCTION [dbo].[FN_ObterPontos] (@termo VARCHAR(100))
RETURNS TABLE
AS
RETURN (
    SELECT [id],
           [nome],
           [cidade],
           [estado],
           [referencia],
           [descricao],
           [timestamp]
      FROM [dbo].[Ponto]
     WHERE [nome]       LIKE @termo
        OR [descricao]  LIKE @termo
        OR [referencia] LIKE @termo
)
GO