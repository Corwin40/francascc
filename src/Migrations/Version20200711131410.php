<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200711131410 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE college (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, complement VARCHAR(255) DEFAULT NULL, zipcode VARCHAR(5) DEFAULT NULL, city VARCHAR(50) DEFAULT NULL, college_email VARCHAR(100) DEFAULT NULL, group_email VARCHAR(100) DEFAULT NULL, college_phone VARCHAR(14) DEFAULT NULL, group_phone VARCHAR(14) DEFAULT NULL, animateur VARCHAR(100) DEFAULT NULL, create_at DATETIME DEFAULT NULL, update_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE config CHANGE description description VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD college_id INT DEFAULT NULL, CHANGE roles roles JSON NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649770124B2 FOREIGN KEY (college_id) REFERENCES college (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649770124B2 ON user (college_id)');
        $this->addSql('ALTER TABLE page CHANGE author_id author_id INT DEFAULT NULL, CHANGE meta_keywords meta_keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', CHANGE tags tags LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', CHANGE publish_at publish_at DATETIME DEFAULT NULL, CHANGE publish_end publish_end DATETIME DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE section CHANGE page_id page_id INT DEFAULT NULL, CHANGE class_name class_name VARCHAR(25) DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE articles CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649770124B2');
        $this->addSql('DROP TABLE college');
        $this->addSql('ALTER TABLE articles CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE config CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE page CHANGE author_id author_id INT DEFAULT NULL, CHANGE meta_keywords meta_keywords LONGTEXT CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', CHANGE tags tags LONGTEXT CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', CHANGE publish_at publish_at DATETIME DEFAULT \'NULL\', CHANGE publish_end publish_end DATETIME DEFAULT \'NULL\', CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE section CHANGE page_id page_id INT DEFAULT NULL, CHANGE class_name class_name VARCHAR(25) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('DROP INDEX IDX_8D93D649770124B2 ON user');
        $this->addSql('ALTER TABLE user DROP college_id, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
