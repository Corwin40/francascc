<?php

namespace App\Entity\Admin;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Admin\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"users_read"}
 *     }
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     *
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="L'adresse mail est obligatoire")
     * @Assert\Email(message="L'adresse mail est manquante où mal écrite")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     *
     * @Groups({"users_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     *
     * @Groups({"users_read"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Ce champs doit contenir un prénom")
     * @Assert\Length(min=3, minMessage="le prénom doit contenir entre 3 et 255 caractères", max=255, maxMessage="le prénom doit contenir entre 3 et 255 caractères")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Ce champs doit contenir un nom")
     * @Assert\Length(min=3, minMessage="le nom doit contenir entre 3 et 255 caractères", max=255, maxMessage="le om doit contenir entre 3 et 255 caractères")
     */
    private $lastName;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"users_read"})
     */
    private $isActive;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"users_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime")
     *
     * @Groups({"users_read"})
     */
    private $updateAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    /**
     * @param bool $isActive
     * @return $this
     * @ORM\PrePersist()
     */
    public function setIsActive(bool $isActive): self
    {
        $this->isActive = false;

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
}
