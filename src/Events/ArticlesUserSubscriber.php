<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Webapp\Articles;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ArticlesUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    // Créer l'évènement
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForArticles', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForArticles(ViewEvent $event)
    {
        $article = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); //Renvoi quel méthode est utilisée : POST, GET, PUT, ...

        if($article instanceof Articles && $method==="POST")
        {
            // Récupération de l'user en cours par le composant security
            $user = $this->security->getUser();
            // Assigner l'User récupérer sur le client en création
            $article->setAuthor($user);
        }

    }
}