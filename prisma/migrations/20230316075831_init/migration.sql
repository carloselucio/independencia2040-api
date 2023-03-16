BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [first_name] VARCHAR(40) NOT NULL,
    [paternal_surname] VARCHAR(20) NOT NULL,
    [maternal_surname] VARCHAR(20) NOT NULL,
    [email] VARCHAR(40) NOT NULL,
    [password] VARCHAR(40) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_password_key] UNIQUE NONCLUSTERED ([password])
);

-- CreateTable
CREATE TABLE [dbo].[Person] (
    [id] INT NOT NULL IDENTITY(1,1),
    [first_name] VARCHAR(40) NOT NULL,
    [paternal_surname] VARCHAR(20) NOT NULL,
    [maternal_surname] VARCHAR(20) NOT NULL,
    [full_name] VARCHAR(80) NOT NULL,
    [gender] VARCHAR(10) NOT NULL,
    [birth_date] DATETIME2 NOT NULL,
    [phone_number] VARCHAR(16) NOT NULL,
    [person_2040] VARCHAR(6) NOT NULL,
    [has_photo] BIT NOT NULL,
    [religion] VARCHAR(30) NOT NULL,
    [health_insurance] VARCHAR(16) NOT NULL,
    [civil_status] VARCHAR(16) NOT NULL,
    [status] VARCHAR(16) NOT NULL,
    CONSTRAINT [Person_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Beneficiary] (
    [id] INT NOT NULL IDENTITY(1,1),
    [person_id] INT NOT NULL,
    [responsible_id] INT,
    [curp] VARCHAR(20),
    [is_tentative_birth_date] BIT NOT NULL,
    [how_found_out] VARCHAR(30) NOT NULL,
    CONSTRAINT [Beneficiary_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Beneficiary_person_id_key] UNIQUE NONCLUSTERED ([person_id])
);

-- CreateTable
CREATE TABLE [dbo].[Familiar] (
    [id] INT NOT NULL IDENTITY(1,1),
    [person_id] INT NOT NULL,
    [beneficiary_id] INT NOT NULL,
    [relationship] VARCHAR(20) NOT NULL,
    CONSTRAINT [Familiar_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Familiar_person_id_key] UNIQUE NONCLUSTERED ([person_id])
);

-- CreateTable
CREATE TABLE [dbo].[Education] (
    [id] INT NOT NULL IDENTITY(1,1),
    [school_level] VARCHAR(20) NOT NULL,
    [last_school_grade] VARCHAR(40) NOT NULL,
    [is_studying] BIT NOT NULL,
    [career] VARCHAR(40) NOT NULL,
    [familiar_id] INT NOT NULL,
    CONSTRAINT [Education_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Education_familiar_id_key] UNIQUE NONCLUSTERED ([familiar_id])
);

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(30) NOT NULL,
    [occupation] VARCHAR(30) NOT NULL,
    [has_health_insurance] BIT NOT NULL,
    [position] VARCHAR(30) NOT NULL,
    [salary] FLOAT(53),
    [familiar_id] INT NOT NULL,
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Job_familiar_id_key] UNIQUE NONCLUSTERED ([familiar_id])
);

-- CreateTable
CREATE TABLE [dbo].[Family] (
    [id] INT NOT NULL IDENTITY(1,1),
    [parents_civil_status] VARCHAR(16) NOT NULL,
    [house_type] VARCHAR(30) NOT NULL,
    [number_of_siblings] INT NOT NULL,
    [civil_registration] BIT NOT NULL,
    [has_birth_certificate_photo] BIT NOT NULL,
    [beneficiary_id] INT NOT NULL,
    CONSTRAINT [Family_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Family_beneficiary_id_key] UNIQUE NONCLUSTERED ([beneficiary_id])
);

-- CreateTable
CREATE TABLE [dbo].[Health] (
    [id] INT NOT NULL IDENTITY(1,1),
    [birth_hospital] VARCHAR(70) NOT NULL,
    [birth_weight] FLOAT(53),
    [birth_height] FLOAT(53),
    [has_vaccination_card_photo] BIT NOT NULL,
    [beneficiary_id] INT NOT NULL,
    CONSTRAINT [Health_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Health_beneficiary_id_key] UNIQUE NONCLUSTERED ([beneficiary_id])
);

-- CreateTable
CREATE TABLE [dbo].[Location] (
    [id] INT NOT NULL IDENTITY(1,1),
    [state] VARCHAR(30) NOT NULL,
    [municipality] VARCHAR(30) NOT NULL,
    [locality] VARCHAR(30) NOT NULL,
    [neighborhood] VARCHAR(30) NOT NULL,
    [street] VARCHAR(30),
    [outdoor_number] VARCHAR(8),
    [interior_number] VARCHAR(8),
    [zip_code] VARCHAR(8),
    [beneficiary_id] INT NOT NULL,
    CONSTRAINT [Location_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Location_beneficiary_id_key] UNIQUE NONCLUSTERED ([beneficiary_id])
);

-- CreateTable
CREATE TABLE [dbo].[Vaccine] (
    [id] INT NOT NULL IDENTITY(1,1),
    [health_id] INT NOT NULL,
    [name] VARCHAR(30) NOT NULL,
    [was_applied] BIT NOT NULL,
    [date] DATETIME2,
    CONSTRAINT [Vaccine_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Spirituality] (
    [id] INT NOT NULL IDENTITY(1,1),
    [person_id] INT NOT NULL,
    [field] VARCHAR(20) NOT NULL,
    CONSTRAINT [Spirituality_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Beneficiary] ADD CONSTRAINT [Beneficiary_person_id_fkey] FOREIGN KEY ([person_id]) REFERENCES [dbo].[Person]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Beneficiary] ADD CONSTRAINT [Beneficiary_responsible_id_fkey] FOREIGN KEY ([responsible_id]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Familiar] ADD CONSTRAINT [Familiar_person_id_fkey] FOREIGN KEY ([person_id]) REFERENCES [dbo].[Person]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Familiar] ADD CONSTRAINT [Familiar_beneficiary_id_fkey] FOREIGN KEY ([beneficiary_id]) REFERENCES [dbo].[Beneficiary]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Education] ADD CONSTRAINT [Education_familiar_id_fkey] FOREIGN KEY ([familiar_id]) REFERENCES [dbo].[Familiar]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_familiar_id_fkey] FOREIGN KEY ([familiar_id]) REFERENCES [dbo].[Familiar]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Family] ADD CONSTRAINT [Family_beneficiary_id_fkey] FOREIGN KEY ([beneficiary_id]) REFERENCES [dbo].[Beneficiary]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Health] ADD CONSTRAINT [Health_beneficiary_id_fkey] FOREIGN KEY ([beneficiary_id]) REFERENCES [dbo].[Beneficiary]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Location] ADD CONSTRAINT [Location_beneficiary_id_fkey] FOREIGN KEY ([beneficiary_id]) REFERENCES [dbo].[Beneficiary]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Vaccine] ADD CONSTRAINT [Vaccine_health_id_fkey] FOREIGN KEY ([health_id]) REFERENCES [dbo].[Health]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Spirituality] ADD CONSTRAINT [Spirituality_person_id_fkey] FOREIGN KEY ([person_id]) REFERENCES [dbo].[Person]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
