<?php

namespace App\Controller\Webapp;

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
}
