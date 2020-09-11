<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Admin\College;
use App\Repository\Webapp\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
        "groups"={"sections_read"}
 *     },
 * )
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=SectionRepository::class)
 */
class Section
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"sections_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     *
     * @Groups({"sections_read"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Page::class, inversedBy="sections")
     *
     * @Groups({"sections_read"})
     */
    private $page;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     *
     * @Groups({"sections_read"})
     */
    private $className;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"sections_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"sections_read"})
     */
    private $updateAt;

    /**
     * @ORM\ManyToMany(targetEntity=Articles::class, mappedBy="section")
     */
    private $articles;

    /**
     * @ORM\ManyToMany(targetEntity=College::class, mappedBy="section")
     */
    private $colleges;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->colleges = new ArrayCollection();
    }

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

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): self
    {
        $this->page = $page;

        return $this;
    }

    public function getClassName(): ?string
    {
        return $this->className;
    }

    public function setClassName(?string $className): self
    {
        $this->className = $className;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreateAt(): self
    {
        $this->createAt = new \DateTime();

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function setUpdateAt(): self
    {
        $this->updateAt = new \DateTime();

        return $this;
    }

    /**
     * @return Collection|Articles[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Articles $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addSection($this);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeSection($this);
        }

        return $this;
    }

    /**
     * @return Collection|College[]
     */
    public function getColleges(): Collection
    {
        return $this->colleges;
    }

    public function addCollege(College $college): self
    {
        if (!$this->colleges->contains($college)) {
            $this->colleges[] = $college;
            $college->addSection($this);
        }

        return $this;
    }

    public function removeCollege(College $college): self
    {
        if ($this->colleges->contains($college)) {
            $this->colleges->removeElement($college);
            $college->removeSection($this);
        }

        return $this;
    }
}
