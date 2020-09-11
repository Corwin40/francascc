<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Entity\Admin\User;
use App\Repository\Webapp\PageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"pages_read"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=PageRepository::class)
 */
class Page
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"pages_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"pages_read", "users_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"pages_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=100)
     *
     * @Groups({"pages_read"})
     */
    private $state;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"pages_read"})
     */
    private $isMenu;

    /**
     * @ORM\Column(type="array", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $metaKeywords = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $metaDescription;

    /**
     * @ORM\Column(type="array", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $tags = [];

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="pages")
     *
     * @Groups({"pages_read"})
     */
    private $author;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $publishAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $publishEnd;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"pages_read"})
     */
    private $updateAt;

    /**
     * @ORM\OneToMany(targetEntity=Section::class, mappedBy="page", cascade={"remove"})
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Groups({"pages_read"})
     * @ApiSubresource()
     */
    private $sections;

    public function __construct()
    {
        $this->sections = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getIsMenu(): ?bool
    {
        return $this->isMenu;
    }

    public function setIsMenu(bool $isMenu): self
    {
        $this->isMenu = $isMenu;

        return $this;
    }

    public function getMetaKeywords(): ?array
    {
        return $this->metaKeywords;
    }

    public function setMetaKeywords(?array $metaKeywords): self
    {
        $this->metaKeywords = $metaKeywords;

        return $this;
    }

    public function getMetaDescription(): ?string
    {
        return $this->metaDescription;
    }

    public function setMetaDescription(?string $metaDescription): self
    {
        $this->metaDescription = $metaDescription;

        return $this;
    }

    public function getTags(): ?array
    {
        return $this->tags;
    }

    public function setTags(?array $tags): self
    {
        $this->tags = $tags;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getPublishAt(): ?\DateTimeInterface
    {
        return $this->publishAt;
    }

    public function setPublishAt(?\DateTimeInterface $publishAt): self
    {
        $this->publishAt = $publishAt;

        return $this;
    }

    public function getPublishEnd(): ?\DateTimeInterface
    {
        return $this->publishEnd;
    }

    public function setPublishEnd(?\DateTimeInterface $publishEnd): self
    {
        $this->publishEnd = $publishEnd;

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
     * @return Collection|Section[]
     */
    public function getSections(): Collection
    {
        return $this->sections;
    }

    public function addSection(Section $section): self
    {
        if (!$this->sections->contains($section)) {
            $this->sections[] = $section;
            $section->setPage($this);
        }

        return $this;
    }

    public function removeSection(Section $section): self
    {
        if ($this->sections->contains($section)) {
            $this->sections->removeElement($section);
            // set the owning side to null (unless already changed)
            if ($section->getPage() === $this) {
                $section->setPage(null);
            }
        }

        return $this;
    }
}
