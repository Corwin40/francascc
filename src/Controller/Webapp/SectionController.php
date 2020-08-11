<?php

namespace App\Controller\Webapp;

use App\Entity\Webapp\Section;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class SectionController
 * @package App\Controller\Webapp
 * @Route("/webapp/section", name="op_webapp_section_")
 */
class SectionController extends AbstractController
{
    /**
     * Liste toutes les sections de l'application liées à une page.
     * @Route("/listallsections/{page}", name="listallsections")
     */
    public function ListAllSections($page)
    {
        $sections = $this
            ->getDoctrine()
            ->getRepository(Section::class)
            ->ListAllSections($page)
        ;

        return $this->render('webapp/section/listsections.html.twig',[
            'sections' => $sections,
        ]);
    }
}
