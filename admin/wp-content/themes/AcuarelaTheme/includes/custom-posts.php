<?php

function myPostTypes(){
    create_post_types('Secciones Promo del home', 'Sección Promo del home', 'dashicons-megaphone', 'promo-home');
    create_post_types('Planes y precios', 'Plan y precio', 'dashicons-money-alt', 'plan-precio');
    create_post_types('Testimonios', 'Testimonio', 'dashicons-admin-comments', 'testimonio');
    create_post_types('Preguntas Frecuentes', 'Pregunta Frecuente', 'dashicons-archive', 'preguntas-frecuentes');
    create_post_types('Leads invitación', 'Lead invitación', 'dashicons-buddicons-pm', 'leads-invitation');
}

function create_post_types($name, $singularName, $icon, $slug){
    register_post_type( $slug, array(
        'exclude_from_search' => true,
        'has_archive' => true,
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'rest_base' =>  $slug,
        'labels' => array(
            'name' => ($name),
            'singlar_name' => ($singularName),
            'add_new' => ('Agregar ' . $singularName),
            'add_new_item' => ('Agregar ' . $singularName),
            'edit_item' => ('Editar ' . $singularName),
            'new_item' => ('Agregar ' . $singularName),
            'view_item' => ('Ver ' . $singularName),
            'not_found' => ('No se encontraron ' . $name)
        ),
        'menu_icon' => $icon,
        'public' => true,
        'publicly_queryable' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'show_ui' => true,
        'capability_type' => 'post',
        'rewrite' => array('slag' => $slug),
        'rest_controller_class' => 'WP_REST_Posts_Controller'
    ));
}
add_action('init', 'myPostTypes');
