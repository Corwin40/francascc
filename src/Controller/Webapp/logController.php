<?php

namespace App\Controller\Webapp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class logController
 * @package App\Controller\Webapp
 * @Route("/", name="op_webapp_log_")
 */
class logController extends AbstractController
{
    /**
     * @Route("/op_login/", name="login")
     */
    public function index()
    {
        return $this->render('webapp/log/index.html.twig');
    }
}
