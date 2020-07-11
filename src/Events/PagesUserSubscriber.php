<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Webapp\Page;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PagesUserSubscriber implements EventSubscriberInterface
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
        $page = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); //Renvoi quel méthode est utilisée : POST, GET, PUT, ...

        if($page instanceof Page && $method==="POST")
        {
            // Récupération de l'user en cours par le composant security
            $user = $this->security->getUser();
            // Assigner l'User récupérer sur le client en création
            $page->setAuthor($user);
        }

    }
}