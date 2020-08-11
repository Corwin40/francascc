<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200810092135 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user CHANGE college_id college_id INT DEFAULT NULL, CHANGE roles roles JSON NOT NULL');
        $this->addSql('ALTER TABLE college CHANGE address address VARCHAR(255) DEFAULT NULL, CHANGE complement complement VARCHAR(255) DEFAULT NULL, CHANGE zipcode zipcode VARCHAR(5) DEFAULT NULL, CHANGE city city VARCHAR(50) DEFAULT NULL, CHANGE college_email college_email VARCHAR(100) DEFAULT NULL, CHANGE group_email group_email VARCHAR(100) DEFAULT NULL, CHANGE college_phone college_phone VARCHAR(14) DEFAULT NULL, CHANGE group_phone group_phone VARCHAR(14) DEFAULT NULL, CHANGE animateur animateur VARCHAR(100) DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE page CHANGE author_id author_id INT DEFAULT NULL, CHANGE meta_keywords meta_keywords LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', CHANGE tags tags LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', CHANGE publish_at publish_at DATETIME DEFAULT NULL, CHANGE publish_end publish_end DATETIME DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE section CHANGE page_id page_id INT DEFAULT NULL, CHANGE class_name class_name VARCHAR(25) DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE category CHANGE articles_id articles_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE articles CHANGE college_id college_id INT DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT NULL, CHANGE update_at update_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE articles CHANGE college_id college_id INT DEFAULT NULL, CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE category CHANGE articles_id articles_id INT DEFAULT NULL, CHANGE name name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE college CHANGE address address VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE complement complement VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE zipcode zipcode VARCHAR(5) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE city city VARCHAR(50) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE college_email college_email VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE group_email group_email VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE college_phone college_phone VARCHAR(14) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE group_phone group_phone VARCHAR(14) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE animateur animateur VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE page CHANGE author_id author_id INT DEFAULT NULL, CHANGE meta_keywords meta_keywords LONGTEXT CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', CHANGE tags tags LONGTEXT CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', CHANGE publish_at publish_at DATETIME DEFAULT \'NULL\', CHANGE publish_end publish_end DATETIME DEFAULT \'NULL\', CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE section CHANGE page_id page_id INT DEFAULT NULL, CHANGE class_name class_name VARCHAR(25) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE create_at create_at DATETIME DEFAULT \'NULL\', CHANGE update_at update_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE college_id college_id INT DEFAULT NULL, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
