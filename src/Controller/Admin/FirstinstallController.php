<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class FirstinstallController
 * @package App\Controller\Admin
 * @Route("/admin/", name="op_admin_")
 */
class FirstinstallController extends AbstractController
{
    /**
     * @Route("firstinstall", name="firstinstall")
     */
    public function index()
    {
        return $this->render('admin/firstinstall/index.html.twig');

    }
}
