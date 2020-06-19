<?php

namespace App\Controller\Webapp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AppController
 * @package App\Controller\Webapp
 * @Route("/",name="op_webapp_app")
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", name="webapp_app_index")
     */
    public function index()
    {
        return $this->render('webapp/app/index.html.twig');
    }
}
