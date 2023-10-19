import React from "react";
import {userEvent}  from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { render, screen} from "@testing-library/react";
import App from "../src/App";

describe("<App />", () => {

    test("should add items and remove the", async () => {
        const user = userEvent.setup();

        render(<App />);
        
        // buscar el input
        const input = screen.getByRole("textbox");
        expect(input).toBeDefined();

        // buscar el formulario
        const form = screen.getByRole("form");
        expect(form).toBeDefined();

        // buscar el boton
        const button = form.querySelector("button")
        expect(button).toBeDefined();

        const randomText = crypto.randomUUID();
        await user.type(input, randomText);
        await user.click(button)


        // asegurar que el elemento se ha agregado
        const list = screen.getByRole("list");
        expect(list).toBeDefined();
        expect(list.childNodes.length).toBe(1);


        // asegurar que el elemento se puede borrar
        const item = screen.getByText(randomText)
        const removeButton = item.querySelector("button");
        expect(removeButton).toBeDefined();

        await user.click(removeButton);

        const noResults = screen.getByText("No hay elementos en la lista");
        expect(noResults).toBeDefined();

    })



    // test('should work', () => {
    //     render(<App />)
    //     screen.debug()

    //     expect(

    //         screen.getByText('Mi prueba tecnica')
    //     ).toBeDefined()
    // });
});