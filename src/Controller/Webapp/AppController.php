<?php

namespace App\Controller\Webapp;

use App\Entity\Admin\Config;
use App\Entity\Webapp\Page;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AppController
 * @package App\Controller\Webapp
 * @Route("/",name="op_webapp_app_")
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        $config = $this->getDoctrine()->getRepository(Config::class)->find(1);
        if(!$config)
        {
            return $this->redirectToRoute('op_admin_firstinstall');
        }
        return $this->render('webapp/app/index.html.twig');
    }

    /**
     * Affiche la page de menu
     * @Route("/{slug}", name="page")
     */
    public function showPage($slug)
    {
        $page = $this->getDoctrine()
            ->getRepository(Page::class)
            ->findOneBy(['slug' => $slug]);

        if (!$page) {
            throw $this->createNotFoundException(
                "La page n'existe pas" .$slug
            );
        }


        return $this->render('webapp/app/page.html.twig', [
            'page' => $page
        ]);
    }

    /**
     * Page React de connexion de l'espace college (espcoll)
     * @Route("/admin/espcoll", name="espcoll")
     */
    public function college()
    {
        return $this->render('webapp/app/espcoll.html.twig');
    }

}
