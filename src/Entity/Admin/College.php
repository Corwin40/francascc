<?php

namespace App\Entity\Admin;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Webapp\Articles;
use App\Entity\Webapp\Section;
use App\Repository\Admin\CollegeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CollegeRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={
        "groups"={"colleges_read"}
 *     }
 * )
 */
class College
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"colleges_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"colleges_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $complement;

    /**
     * @ORM\Column(type="string", length=5, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $collegeEmail;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $groupEmail;

    /**
     * @ORM\Column(type="string", length=14, nullable=true)
     * @Groups({"colleges_read"})
     *
     */
    private $collegePhone;

    /**
     * @ORM\Column(type="string", length=14, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $groupPhone;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $animateur;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"colleges_read"})
     */
    private $updateAt;

    /**
     * @ORM\OneToMany(targetEntity=Articles::class, mappedBy="college")
     */
    private $articles;

    /**
     * @ORM\ManyToMany(targetEntity=Section::class, inversedBy="colleges")
     */
    private $section;

    public function __construct()
    {
        $this->user = new ArrayCollection();
        $this->articles = new ArrayCollection();
        $this->section = new ArrayCollection();
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getComplement(): ?string
    {
        return $this->complement;
    }

    public function setComplement(?string $complement): self
    {
        $this->complement = $complement;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCollegeEmail(): ?string
    {
        return $this->collegeEmail;
    }

    public function setCollegeEmail(?string $collegeEmail): self
    {
        $this->collegeEmail = $collegeEmail;

        return $this;
    }

    public function getGroupEmail(): ?string
    {
        return $this->groupEmail;
    }

    public function setGroupEmail(?string $groupEmail): self
    {
        $this->groupEmail = $groupEmail;

        return $this;
    }

    public function getCollegePhone(): ?string
    {
        return $this->collegePhone;
    }

    public function setCollegePhone(?string $collegePhone): self
    {
        $this->collegePhone = $collegePhone;

        return $this;
    }

    public function getGroupPhone(): ?string
    {
        return $this->groupPhone;
    }

    public function setGroupPhone(?string $groupPhone): self
    {
        $this->groupPhone = $groupPhone;

        return $this;
    }

    public function getAnimateur(): ?string
    {
        return $this->animateur;
    }

    public function setAnimateur(?string $animateur): self
    {
        $this->animateur = $animateur;

        return $this;
    }

    public function getTeen(): ?string
    {
        return $this->teen;
    }

    public function setTeen(?string $teen): self
    {
        $this->teen = $teen;

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
            $article->setCollege($this);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            // set the owning side to null (unless already changed)
            if ($article->getCollege() === $this) {
                $article->setCollege(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Section[]
     */
    public function getSection(): Collection
    {
        return $this->section;
    }

    public function addSection(Section $section): self
    {
        if (!$this->section->contains($section)) {
            $this->section[] = $section;
        }

        return $this;
    }

    public function removeSection(Section $section): self
    {
        if ($this->section->contains($section)) {
            $this->section->removeElement($section);
        }

        return $this;
    }

}
