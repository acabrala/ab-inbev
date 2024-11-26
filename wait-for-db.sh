#!/bin/bash
# Espera até que o banco de dados PostgreSQL esteja aceitando conexões
until pg_isready -h postgres -p 5432; do
  echo "Esperando o banco de dados ficar disponível..."
  sleep 2
done
echo "Banco de dados pronto!"
