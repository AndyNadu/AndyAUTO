﻿using DealerAUTO.DTO.Models;
using System.Linq.Expressions;

namespace DealerAUTO.Repository.Interfaces;

public interface IReadOnlyRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey, bool>
    where TKey : class
{
}