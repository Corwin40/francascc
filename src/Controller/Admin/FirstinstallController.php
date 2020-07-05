<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FirstinstallController extends AbstractController
{
    /**
     * @Route("/admin/firstinstall", name="admin_firstinstall")
     */
    public function index()
    {
        return $this->render('admin/firstinstall/index.html.twig');

    }
}
