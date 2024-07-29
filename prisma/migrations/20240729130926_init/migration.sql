-- CreateTable
CREATE TABLE `almacen` (
    `almacen_id` INTEGER NOT NULL AUTO_INCREMENT,
    `almacen_nombre` VARCHAR(100) NOT NULL,
    `almacen_cantidad` INTEGER NOT NULL,
    `almacen_tipo` INTEGER NOT NULL,
    `almacen_estado` INTEGER NOT NULL,
    `almacen_fecha_de_expiracion` DATE NOT NULL,

    INDEX `almacen_cantidad`(`almacen_cantidad`),
    INDEX `almacen_estado`(`almacen_estado`),
    INDEX `almacen_tipo`(`almacen_tipo`),
    PRIMARY KEY (`almacen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donaciones` (
    `donaciones_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `donaciones_tipo_id` INTEGER NOT NULL,
    `donaciones_motivo_id` INTEGER NOT NULL,
    `donaciones_nombre_receptor` TEXT NOT NULL,
    `donaciones_cedula_receptor` INTEGER NOT NULL,
    `donaciones_telefono_receptor` VARCHAR(50) NOT NULL,
    `donaciones_edad_receptor` INTEGER NOT NULL,
    `donaciones_parroquia` TEXT NOT NULL,
    `donaciones_diagnostico_receptor` TEXT NOT NULL,
    `donaciones_almacen_id` INTEGER NOT NULL,
    `donaciones_almacen_cantidad` INTEGER NOT NULL,
    `donaciones_descripcion` TEXT NOT NULL,
    `donaciones_fecha_alta` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `donaciones_almacen_cantidad`(`donaciones_almacen_cantidad`),
    INDEX `donaciones_almacen_id`(`donaciones_almacen_id`),
    INDEX `donaciones_motivo_id`(`donaciones_motivo_id`),
    INDEX `donaciones_tipo_id`(`donaciones_tipo_id`),
    PRIMARY KEY (`donaciones_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donaciones_motivo` (
    `motivo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` TEXT NOT NULL,

    PRIMARY KEY (`motivo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donaciones_tipos` (
    `tipo_donaciones_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_donaciones_nombre` TEXT NOT NULL,

    PRIMARY KEY (`tipo_donaciones_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insumos_estado` (
    `insumo_estado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `insumo_estado_nombre` TEXT NOT NULL,

    PRIMARY KEY (`insumo_estado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `users_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nombre` TEXT NOT NULL,
    `apellido` TEXT NOT NULL,
    `users_role_id` INTEGER NOT NULL,

    INDEX `users_role_id`(`users_role_id`),
    PRIMARY KEY (`users_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_roles` (
    `roles_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `roles_nombre` TEXT NOT NULL,

    PRIMARY KEY (`roles_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `almacen` ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`almacen_estado`) REFERENCES `insumos_estado`(`insumo_estado_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `almacen` ADD CONSTRAINT `almacen_ibfk_2` FOREIGN KEY (`almacen_tipo`) REFERENCES `donaciones_tipos`(`tipo_donaciones_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donaciones` ADD CONSTRAINT `donaciones_ibfk_1` FOREIGN KEY (`donaciones_almacen_id`) REFERENCES `almacen`(`almacen_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donaciones` ADD CONSTRAINT `donaciones_ibfk_3` FOREIGN KEY (`donaciones_tipo_id`) REFERENCES `donaciones_tipos`(`tipo_donaciones_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donaciones` ADD CONSTRAINT `donaciones_ibfk_4` FOREIGN KEY (`donaciones_motivo_id`) REFERENCES `donaciones_motivo`(`motivo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`users_role_id`) REFERENCES `users_roles`(`roles_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
