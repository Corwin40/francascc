<?php

namespace App\Entity\Admin;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Admin\ConfigRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
        "groups"={"configs_read"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=ConfigRepository::class)
 */
class Config
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"configs_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"configs_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     *
     * @Groups({"configs_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"configs_read"})
     */
    private $isOffline;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getIsOffline(): ?bool
    {
        return $this->isOffline;
    }

    public function setIsOffline(bool $isOffline): self
    {
        $this->isOffline = $isOffline;

        return $this;
    }
}
