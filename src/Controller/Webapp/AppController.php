<?php

namespace App\Controller\Webapp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/webapp/app", name="webapp_app")
     */
    public function index()
    {
        return $this->render('webapp/app/index.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }
}
